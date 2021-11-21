package co.edu.usa.g1s1;

import co.edu.usa.g1s1.modelo.Empresa;
import co.edu.usa.g1s1.repositorios.EmpresaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = {"co.edu.usa.g1s1"})
public class G1S1Application {

    @Autowired
    private EmpresaRepository repoEmpresa;

    public static void main(String[] args) {
        SpringApplication.run(G1S1Application.class, args);
    }

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            System.out.println("APLICACION INICIADA!.");
            List<Empresa> cs = repoEmpresa.getAll();
            System.out.println("Empresas: " + cs.size());

        };
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }

}
