package com.chatapp.repositories;


import com.chatapp.entities.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,Integer> {

    List<MessageEntity> findByRoomId(Integer roomId);



}
