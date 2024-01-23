package backend.v360.backend.java.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.v360.backend.java.entities.Leite;

public interface LeiteRepository extends JpaRepository <Leite, Integer>{

    List<Leite> findByNome(String nome);

    List<Leite> findByNomeIgnoreCaseContaining(String termo);
    
}
