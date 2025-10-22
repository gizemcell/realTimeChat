package com.chatapp.controller;

import com.chatapp.dto.DtoMessage;

import java.util.List;

public interface IMessageController {




    public List<DtoMessage> sent(DtoMessage dtoMessage);
    public List<DtoMessage> get(Integer roomId);
    //update olabilir


}
