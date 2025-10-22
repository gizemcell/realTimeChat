package com.chatapp.controller.impl;

import com.chatapp.controller.IMessageController;
import com.chatapp.dto.DtoMessage;
import com.chatapp.services.IMessageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/chat")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController implements IMessageController {

    private final IMessageService messageService;

    @Override
    @PostMapping("/sentMessage")
    public List<DtoMessage> sent(@RequestBody DtoMessage dtoMessage) {
        return messageService.saveMessage(dtoMessage);
    }

    @Override
    @GetMapping("/getMessage/{id}")
    public List<DtoMessage> get(@PathVariable("id") Integer roomId) {
        return messageService.receivedMessagesById(roomId);
    }
}
