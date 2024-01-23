package backend.v360.backend.java.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.v360.backend.java.entities.Leite;
import backend.v360.backend.java.repositories.LeiteRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class LeiteService {

    @Autowired
    private LeiteRepository leiteRepository;

    // Obtém um leite pelo ID. Se não encontrar pelo ID fornecido, retorna null.
    public Leite getLeiteById(int id) {
        Leite leite = leiteRepository.findById(id).orElse(null);

        if (leite != null) {
            return leite;
        } else {
            throw new EntityNotFoundException("Erro 404: Leite não encontrado com ID: " + id);
        }
    }

    // Obtém todos os leites da lista
    public List<Leite> getLeite() {
        return leiteRepository.findAll();
    }

    // Exclui um leite pelo ID
    public void delete(int id) {
        Leite leite = getLeiteById(id);
        leiteRepository.delete(leite);
    }

    // Salva ou atualiza um leite
    public Leite save(Leite leite) {
        return leiteRepository.save(leite);

        
    }

    // Busca leites pelo nome, ignorando maiúsculas e minúsculas, e permitindo pesquisa por parte do nome
    public List<Leite> getLeiteByNome(String nome) {
    return leiteRepository.findByNomeIgnoreCaseContaining(nome);
}

    
}
