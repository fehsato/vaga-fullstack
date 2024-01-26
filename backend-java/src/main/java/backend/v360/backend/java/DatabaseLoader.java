package backend.v360.backend.java;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import backend.v360.backend.java.entities.Leite;
import backend.v360.backend.java.repositories.LeiteRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final LeiteRepository leiteRepository;
    private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

    @Autowired
    public DatabaseLoader(LeiteRepository leiteRepository) {
        this.leiteRepository = leiteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Iniciando a carga inicial do banco de dados...");

        Leite leite = new Leite (null, "Leite Nestlé Ninho");
        leiteRepository.save(leite);

        log.info("Leites encontrados no banco de dados:");
        leiteRepository.findAll().forEach(leiteEncontrado -> log.info(leiteEncontrado.toString()));

        log.info("Carga inicial do banco de dados concluída.");
    }
}

