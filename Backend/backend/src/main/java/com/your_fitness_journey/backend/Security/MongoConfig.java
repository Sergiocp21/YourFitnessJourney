/*package com.your_fitness_journey.backend.Security;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

@Configuration
public class MongoConfig {
    // Inyectamos la URL de Mongo desde application.properties
    @Value("${MONGO_URL}")
    private String mongoUri;

    @Bean
    public MongoClient mongoClient() throws NoSuchAlgorithmException, KeyManagementException {
        // 1. Crear un TrustManager que confía en cualquier certificado.
        // Esto es un 'hack' para desarrollo y entornos internos seguros como Coolify.
        TrustManager[] trustAllCerts = new TrustManager[]{
                new X509TrustManager() {
                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                    public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                    public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                }
        };

        // 2. Crear un SSLContext que use nuestro TrustManager "ciego".
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

        // 3. Construir los settings del cliente de MongoDB
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(mongoUri))
                .applyToSslSettings(builder -> {
                    builder.enabled(true);
                    builder.context(sslContext);
                })
                .build();

        // 4. Crear y devolver el cliente con nuestra configuración personalizada.
        return MongoClients.create(settings);
    }

}*/
