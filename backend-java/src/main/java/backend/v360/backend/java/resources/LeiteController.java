package backend.v360.backend.java.resources;

import java.net.URI;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import backend.v360.backend.java.entities.Leite;
import backend.v360.backend.java.services.LeiteService;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class LeiteController {

    @Autowired
    private LeiteService leiteService;

    //Obtém os itens pelo ID
    @GetMapping("{id}")
    public ResponseEntity<Leite> getLeite(@PathVariable int id){
        Leite leite = leiteService.getLeiteById(id);
        return ResponseEntity.ok().body(leite);
        
    }

    
    // Obtém todos os itens ou faz a pesquisa por nome
    @GetMapping("/leites")
public ResponseEntity<List<Leite>> getLeite(@RequestParam(name = "termo", required = false) String termo) {
    System.out.println("Termo recebido: " + termo);

    List<Leite> leites;

    if (termo != null && !termo.isEmpty()) {
        // Se o termo não for nulo nem vazio, pesquisa por ID ou nome
        try {
            int id = Integer.parseInt(termo);
            // Se a conversão for bem-sucedida, pesquisa por ID
            leites = Collections.singletonList(leiteService.getLeiteById(id));
        } catch (NumberFormatException e) {
            // Se a conversão falhar, pesquisa por nome
            leites = leiteService.getLeiteByNome(termo);
        }
    } else {
        // Se o termo for nulo ou vazio, retorna todos os leites
        leites = leiteService.getLeite();
    }

    System.out.println("Resultados da busca: " + leites);

    return ResponseEntity.ok().body(leites);
}

    //Deleta um item pelo ID
     @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteLeite(@PathVariable int id){
        leiteService.delete(id);
        return ResponseEntity.noContent().build();

    }

    //Cria e salva novos itens
    @PostMapping
    public ResponseEntity<Leite> saveLeite(@RequestBody Leite leite ){
        Leite newLeite = leiteService.save(leite);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(newLeite.getId())

        .toUri();
        return ResponseEntity.created(location).body(newLeite);
    }

    
}

