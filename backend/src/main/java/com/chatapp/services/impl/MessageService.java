package com.chatapp.services.impl;


import com.chatapp.dto.DtoMessage;
import com.chatapp.entities.MessageEntity;
import com.chatapp.repositories.MessageRepository;
import com.chatapp.services.IMessageService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService implements IMessageService {


    private final MessageRepository messageRepository;



    @Override
    public DtoMessage saveMessage(DtoMessage dtoMessage) {
        DtoMessage response=new DtoMessage();
        MessageEntity message=new MessageEntity();
        BeanUtils.copyProperties(dtoMessage,message);
        System.out.println(message);
        MessageEntity dbMessage=messageRepository.save(message);
        System.out.println("DBmessage: "+dbMessage.toString());
        BeanUtils.copyProperties(dbMessage,response);
        return response;
    }

    @Override
    public List<DtoMessage> receivedMessagesById(Integer roomId) {
        List<MessageEntity> allMessages=messageRepository.findByRoomId(roomId);
        List<DtoMessage> responseMessages=new ArrayList<>();
        for(MessageEntity entity:allMessages){
            DtoMessage mess=new DtoMessage();
            BeanUtils.copyProperties(entity,mess);
            responseMessages.add(mess);
        }
        return responseMessages;
    }
}
