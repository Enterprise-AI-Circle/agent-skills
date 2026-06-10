# Big T — Token-Effizienz Checkliste

## 1. Code vor dem Model

- [ ] Code bereits strukturieren (Imports, Kommentare, Struktur)
- [ ] Kontext minimieren (nur relevante Dateien)
- [ ] Spezifische Anweisungen statt "Refaktorier alles"
- [ ] Ziel klar definieren (Datei, Zeilen, Struktur)

## 2. Prompt-Chunks statt Monologe

- [ ] Lange Tasks in sequenzielle Schritte aufteilen
- [ ] Zwischenergebnisse prüfen vor nächstem Schritt
- [ ] Korrekturen früh einbauen (nicht am Ende verwerfen)
- [ ] Pro Schritt max. 2–3 Anweisungen

## 3. System-Prompts als Filter

- [ ] System-Prompt mit Effizienz-Regeln konfigurieren
- [ ] "Keine Einleitungen" aktivieren
- [ ] "Max. 20 Zeilen Code" setzen
- [ ] "Nur erklären auf Anfrage" festlegen

## 4. Lokale Models für Routine

- [ ] Routine-Tasks identifizieren (Formatierung, Regex, SQL)
- [ ] Lokales Model (Qwen2.5-Coder, DeepSeek-Coder) bereitstellen
- [ ] Cloud-Model nur für komplexe Reasoning-Tasks nutzen
- [ ] Kosten pro Task tracken

## 5. Token-Monitoring

- [ ] Token-Verbrauch pro Task loggen
- [ ] Kosten pro Model vergleichen
- [ ] Quartalsweise Audit: Welche Tasks kosten am meisten?
- [ ] Budget definieren und kommunizieren

---

*Teil von Goodie Drop #02: Token-Effizienz – AI-Kosten unter Kontrolle*
