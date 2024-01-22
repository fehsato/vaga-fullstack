package backend.v360.backend.java.resources;

import java.net.URI;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import backend.v360.backend.java.entities.Leite;
import backend.v360.backend.java.services.LeiteService;

@RestController
@RequestMapping
@CrossOrigin
public class LeiteController {

    @Autowired
    private LeiteService leiteService;

    //Obtém os itens pelo ID
    @GetMapping("{id}")
    public ResponseEntity<Leite> getLeite(@PathVariable int id){
        Leite leite = leiteService.getLeiteById(id);
        return ResponseEntity.ok().body(leite);
        
    }
    //Obtém todos os itens 
    @GetMapping
    public ResponseEntity<List<Leite>> getLeite(){
        List<Leite> leites = leiteService.getLeite();
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

