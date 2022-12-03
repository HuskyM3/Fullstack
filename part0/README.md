## 0.4
```mermaid
sequenceDiagram
    browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->browser: HTML-code
    
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->browser: main.css
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->browser: main.js
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.json
    server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]
    note over browser: browser executes the event handler that renders notes to display
```

## 0.5
```mermaid
sequenceDiagram
    
    browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->browser: HTML-code
    
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->browser: main.css
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->browser: main.js
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.json
    server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]
    note over browser: browser executes the event handler that renders notes to display
```

## 0.6
