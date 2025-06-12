# 🌐 Visualizador de URL (Módulo Zabbix)

Widget para o Zabbix que permite visualizar qualquer site ou aplicação web diretamente no dashboard, dentro de um iframe.

Este widget foi desenvolvido como um módulo completo, permitindo que a URL seja definida de forma persistente através da tela de configuração do Zabbix. É ideal para facilitar o acesso rápido a sistemas internos, dashboards de outras ferramentas (como Grafana), páginas de status ou qualquer URL relevante para o monitoramento — tudo sem sair da interface do Zabbix.

---

## ✨ Funcionalidades

- Definição da URL de forma persistente na configuração do widget
- Exibição do conteúdo por iframe integrado ao painel
- Interface leve, sem formulários desnecessários

---

## 🚀 Instalação e Configuração

1. **Copie o módulo para o servidor Zabbix**

   - Coloque a pasta do módulo em `/usr/share/zabbix/modules/url_viewer`
   - Dê permissão de leitura ao usuário do servidor web (ex: `www-data` ou `apache`)

2. **Reinicie o servidor web**

   ```bash
   sudo systemctl restart apache2
   # ou
   sudo systemctl restart httpd
   ```

3. **Limpe o cache do navegador**
   
   - Use `Ctrl+F5` ou limpe o cache manualmente para garantir o carregamento da versão mais recente.

4. **Ative o módulo no Zabbix**

   - Acesse: `Administração → Geral → Módulos`
   - Clique em "Scan directory"

5. **Adicione o widget ao dashboard**

   - No dashboard desejado, clique em "*Editar painel*" > "*Adicionar widget*"
   - Selecione "*Visualizador de URL (Módulo)*"
   - Defina a URL desejada e salve

---

## ⚙️ Utilização

- Ao inserir ou editar o widget, configure a URL completa do site/aplicação web que deseja exibir.
- O conteúdo será carregado e exibido automaticamente no painel, de acordo com a URL definida.

---

## ⚠️ Notas e Limitações

- **Permissões do site:** Alguns sites podem bloquear exibição em iframes pelo cabeçalho `X-Frame-Options` ou `Content-Security-Policy`. Caso isso ocorra, não é possível exibi-los no widget.
- **HTTP/HTTPS:** Se o acesso ao Zabbix é via HTTPS, apenas URLs HTTPS funcionarão corretamente dentro do iframe.
- **Login e autenticação:** O widget não gerencia autenticação. Caso a URL exija login, o navegador pode pedir login externo.
- **Acesso de rede:** O computador do usuário que utiliza o Zabbix deve ter acesso de rede direto à URL configurada.

---

## 🛡️ Requisitos

- **Zabbix:** Testado em Zabbix 6.0 ou superior
- **Rede:** Navegador do usuário deve acessar diretamente a URL inserida

---

## 👨‍💻 Desenvolvido por

Redes Tecnologia
