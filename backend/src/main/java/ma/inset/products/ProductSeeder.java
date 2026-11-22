package ma.inset.products;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class ProductSeeder {
    @Bean
    CommandLineRunner seedProducts(ProductRepository products) {
        return args -> {
            if (products.count() == 0) {
                products.saveAll(List.of(
                        new Product("Ordinateur Portable", new BigDecimal("1300.00"), true),
                        new Product("Imprimante Multifonction", new BigDecimal("300.00"), false),
                        new Product("Smartphone 5G", new BigDecimal("800.00"), true)
                ));
            }
        };
    }
}
