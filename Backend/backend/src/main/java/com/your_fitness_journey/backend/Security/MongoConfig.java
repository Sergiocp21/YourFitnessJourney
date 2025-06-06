package com.your_fitness_journey.backend.Security;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

@Configuration
public class MongoConfig {



    @Bean
    public MongoClient mongoClient() throws Exception {
        // Carga el certificado CA
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        InputStream caInput = Files.newInputStream(Paths.get("/etc/mongo/certs/ca.pem"));
        X509Certificate caCert = (X509Certificate) cf.generateCertificate(caInput);

        // Crear un KeyStore con el certificado CA
        KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
        ks.load(null, null);
        ks.setCertificateEntry("caCert", caCert);

        // Crear TrustManager que usa el KeyStore con el CA
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(ks);

        // Crear SSLContext con el TrustManager
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, tmf.getTrustManagers(), null);

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("mongodb://root:password@host:27017/?tls=true"))
                .applyToSslSettings(builder -> builder.enabled(true).context(sslContext))
                .build();

        return MongoClients.create(settings);
    }

}
