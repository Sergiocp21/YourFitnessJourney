# Work in progress

### For now, the only working part is log in with google

```mermaid
flowchart TD
    %% Frontend Components
    subgraph "Frontend"
        direction TB
        ReactApp["React App"]:::frontend
        subgraph "Modules"
            direction LR
            AuthModule["Authentication Module"]:::frontend
            UIComponents["UI Components"]:::frontend
        end
        AuthModule --> ReactApp
        UIComponents --> ReactApp
    end

    %% Backend Components
    subgraph "Backend"
        direction TB
        SpringBootApp["Spring Boot Application"]:::backend
        subgraph "Layers"
            ControllerLayer["Controller"]:::controller
            ServiceLayer["Services"]:::service
            RepositoryLayer["Repository"]:::repository
        end
        subgraph "Security Module"
            JWTSecurity["JWT Security Module (Handles OAuth2)"]:::security
        end
        ControllerLayer --> ServiceLayer
        ServiceLayer --> RepositoryLayer
        ControllerLayer -.->|Secured by| JWTSecurity
    end

    %% OAuth2 Provider
    OAuth2Provider["OAuth2 Provider (Google)"]:::oauth2

    %% Database
    Database["Relational Database"]:::database

    %% Data Flow Connections
    ReactApp -->|"API Calls"| ControllerLayer
    RepositoryLayer -->|"Queries"| Database
    AuthModule -->|"OAuth2 Login"| OAuth2Provider
    OAuth2Provider -->|"Token Exchange"| JWTSecurity

    %% Styles
    classDef default color:red;
    classDef frontend fill:#AEDFF7,stroke:#333,stroke-width:2px;
    classDef backend fill:#C1E1C1,stroke:#333,stroke-width:2px;
    classDef controller fill:#FFF5BA,stroke:#333,stroke-width:2px;
    classDef service fill:#FFD1DC,stroke:#333,stroke-width:2px;
    classDef repository fill:#F7D6AE,stroke:#333,stroke-width:2px;
    classDef security fill:#E2B1F2,stroke:#333,stroke-width:2px;
    classDef database fill:#F7AEC7,stroke:#333,stroke-width:2px;
    classDef oauth2 fill:#A3D8F4,stroke:#333,stroke-width:2px;







```
