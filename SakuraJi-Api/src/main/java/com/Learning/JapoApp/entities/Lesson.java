package com.Learning.JapoApp.entities;

import lombok.Data;

import java.util.List;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    public List<Grammar> getGrammars() {
        return grammars;
    }

    public void setGrammars(List<Grammar> grammars) {
        this.grammars = grammars;
    }
}
