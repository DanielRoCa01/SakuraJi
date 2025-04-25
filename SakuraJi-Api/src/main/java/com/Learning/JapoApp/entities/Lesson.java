package com.Learning.JapoApp.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@Data
public class Lesson {

    private int number;
    private List<Entry> entries;
    private List<Grammar> grammars;

    public Lesson() {
    }

    public Lesson(int number, List<Entry> entries, List<Grammar> grammars) {
        this.number = number;
        this.entries = entries;
        this.grammars = grammars;
    }

}
