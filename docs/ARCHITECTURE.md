# Vacation-Rental Marketplace Production Architecture

A high-level architecture blueprint designed for an Airbnb-scale global vacation rental platform supporting millions of concurrent search queries, real-time booking transactions, dynamic pricing, and petabyte-scale media delivery.

---

## 1. End-to-End System Architecture

```
                                  [ Global Clients ]
                     (Web Desktop / Mobile / Native Apps)
                                       │
                                       ▼
                   ┌───────────────────────────────────────┐
                   │        Cloudflare Anycast CDN         │
                   │  - DDoS Protection & WAF (Edge)       │
                   │  - Edge Static Asset & Image Caching  │
                   │  - TLS Termination & Geo-Routing      │
                   └───────────────────┬───────────────────┘
                                       │
                                       ▼
                   ┌───────────────────────────────────────┐
                   │       API Gateway & Envoy Proxy       │
                   │  - Rate Limiting & Auth Token Verify  │
                   │  - Dynamic GraphQL / REST Routing     │
                   │  - Canary & Circuit Breaking          │
                   └───────────────────┬───────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  Search Service  │          │ Listing Service  │          │ Booking & Pay    │
│  (Go / Rust)     │          │ (Node.js / Go)   │          │ (Java / gRPC)    │
└────────┬─────────┘          └────────┬─────────┘          └────────┬─────────┘
         │                             │                             │
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│ Elasticsearch /  │          │ Read-Replica DB  │          │ CockroachDB /    │
│ OpenSearch       │          │ (PostgreSQL)     │          │ Spanner (ACID)   │
│ Geo-spatial &    │          │ + Redis Cluster  │          │ Distributed Saga │
│ Vector Search    │          │ L1/L2 Metadata   │          │ Multi-region     │
└──────────────────┘          └──────────────────┘          └──────────────────┘
         │                             │                             │
         └─────────────────────────────┼─────────────────────────────┘
                                       ▼
                   ┌───────────────────────────────────────┐
                   │       Apache Kafka Event Bus          │
                   │  - booking.created                    │
                   │  - listing.updated                    │
                   │  - review.submitted                   │
                   └───────────────────┬───────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│ Notification Svc │          │ Media Pipeline   │          │ Analytics & ML   │
│ (Email/SMS/Push) │          │ AWS S3 + Lambda  │          │ Clickstream &    │
│                  │          │ Sharp Transcoder │          │ Pricing Model    │
└──────────────────┘          └──────────────────┘          └──────────────────┘
```

---

## 2. Component Scaling Breakdown

### 2.1 Frontend & Edge Layer
- **Framework**: React 18 with Vite / Next.js SSR for pre-rendering listing detail pages to maximize SEO and First Contentful Paint (FCP < 0.8s).
- **Edge CDN (Cloudflare / Fastly)**: Static bundle distribution, asset caching (stale-while-revalidate), and WebP/AVIF automated image transcoding at edge nodes closest to the user.
- **Client Cache**: TanStack Query / SWR with optimistic updates and local browser persistence for fast photo tour interactions.

### 2.2 Microservices & Application Layer
- **API Gateway (Envoy / Kong)**: Centralized entrypoint managing JWT token validation, rate-limiting per IP/User, request tracing (OpenTelemetry), and routing to downstream microservices via gRPC and HTTP/2.
- **Listing & Availability Service**: Maintains property metadata, amenities, and room taxonomy. Backed by read-replicas and distributed Redis cache for sub-10ms response times.
- **Search & Discovery Engine**: Elasticsearch cluster indexed with Geo-distance polygons, availability bitmap dates, and HNSW vector embeddings for semantic query matching ("beachfront jacuzzi in Goa").
- **Booking & Inventory Engine**: Utilizes the Saga Orchestration pattern with CockroachDB / Google Cloud Spanner to guarantee strict serializability, zero overbooking, and transactional integrity during concurrent checkouts.
- **Media Processing Pipeline**: Raw host uploads trigger AWS S3 Event notifications to AWS Lambda workers running Libvips/Sharp, generating 5 responsive responsive resolutions (thumbnail, medium, large, ultra-wide) and progressive loading blur-hashes.

### 2.3 Storage & Event Bus
- **Primary Relational DB**: PostgreSQL with Patroni for HA and connection pooling via PgBouncer.
- **Distributed Event Streaming**: Apache Kafka partitioned by `listing_id` and `booking_id` ensuring strict ordering of lifecycle events.
- **Multi-Region Replication**: Asynchronous cross-region replication for disaster recovery with active-active read routing.
