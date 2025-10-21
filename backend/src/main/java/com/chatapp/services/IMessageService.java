package com.chatapp.services;

import com.chatapp.dto.DtoMessage;

import java.util.List;

public interface IMessageService {


    public DtoMessage saveMessage(DtoMessage dtoMessage);
    public List<DtoMessage> receivedMessagesById(Integer roomId);
}
