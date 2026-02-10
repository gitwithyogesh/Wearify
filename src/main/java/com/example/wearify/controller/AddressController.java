package com.example.wearify.controller;

import com.example.wearify.model.Address;
import com.example.wearify.model.User;
import com.example.wearify.repository.AddressRepository;
import com.example.wearify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return addressRepository.findByUser(user);
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long id) {
        Optional<Address> address = addressRepository.findById(id);
        return address.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Address> addAddress(@RequestBody Address address, @RequestParam Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            address.setUser(user);
            return ResponseEntity.ok(addressRepository.save(address));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address addressDetails) {
        Optional<Address> address = addressRepository.findById(id);
        if (address.isPresent()) {
            Address existingAddress = address.get();
            existingAddress.setStreet(addressDetails.getStreet());
            existingAddress.setCity(addressDetails.getCity());
            existingAddress.setState(addressDetails.getState());
            existingAddress.setZipCode(addressDetails.getZipCode());
            return ResponseEntity.ok(addressRepository.save(existingAddress));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
