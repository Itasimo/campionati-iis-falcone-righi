# Campionati IIS Falcone-Righi
Applicazione sviluppata in react Vite che serve a gestire i campionati scolastici (specialmente di ping pong) nel nostro istituto. Ho reso il codice open source perchè non penso di mantenere questa webapp per molto quindi aprendo il codice chi ha voglia può apportare eventuali modifiche richieste dai professori.

## Struttura dello Storage
```mermaid
graph TD
a1[Num Input] --> a2[Aggiungi]
a3[Nome Input] --> a2
a2 --> a4{Opzione}
a4 -- Num --> a5(Controlla numeri già esistenti)
a4 -- Nome --> a6((Players))
a5 --> a6
a6 --Read--> a5
a6 --> A{AddPlayersUpdate}
a6 --> B[(SessionStorage Players)]
A --> b1>Elenco Giocatori]
b1 --> b3[Modifica nome]
b1 --> b4[Elimina giocatore]
b1 --> b5[Elimina Tutti]
A --> c1((Players))
B --Read--> c1
c1 --Read--> b1
c1 --Read--> c2(Trova elemento tramite l'ID)
c2 --> c3(Esegui modifiche)
c3 --> C{EditPlayersUpdate}
b3 --> c2
b4 --> c2
b5 --> c2
c3 --> c1
C --> a6
c3 --> B
B --Read--> d1(Calcola Scontri)
A --> d1
C --> d1
d1 --> d2(Mantieni vittorie già presenti)
d2 --> D{ScontriUpdate}
d2 --> E[(Scontri)]
D --> e1(Filtra scontri già giocati)
E --Read--> e1
e1 --> e2>Elenco scontri DA GIOCARE]
e2 --> e3[Vittoria]
e3 --> e4(Aggiungi vittoria)
e4 --> E
E --Read--> e4
e4 --> D
D --> f1(Filtra scontri ancora da giocare)
E --Read--> f1
f1 --> f2>Elenco scontri GIOCATI]
f2 --> f3[Modifica vittoria]
f3 --> f4(Trova elemento tramite l'ID)
f4 --> f5(Modifica vittoria)
f5 --> E
E --Read--> f5
f5 --> D
F{TabSwitch} --> e1
F --> f1
E --Read--> g1>Grafico a torta]
D --> g1
E --Read--> g2>Classifica]
D --> g2
```
### Salvataggio
```mermaid
graph LR
s1[[Timer]] --> s2(SaveData)
sn[SaveNow] --> s2
s2 --Read--> s3[(SessionStorage)]
s2 --Read--> s4[(LocalStorage)]
s2 --> s5(Hash)
s3 --> s5
s4 --> s6[\oldHash\]
s5 --> s7{==}
s6 --> s7
s7 --> s8{{Data}}
s3 --Read--> s8
s8 --> s9[(Firebase)]
```
