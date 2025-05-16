# 🌐 UrlViewer Zabbix Widget

Widget para o Zabbix que permite visualizar qualquer site ou aplicação web diretamente no dashboard, dentro de um iframe.

Desenvolvido para facilitar o acesso rápido a sistemas internos, dashboards, ferramentas web ou qualquer URL relevante para o monitoramento — tudo sem sair da interface do Zabbix.

## ✨ Funcionalidades

* Inserção manual da URL desejada via formulário.
* Validação básica da URL.
* Exibição do site/aplicação web em um iframe.
* Interface leve baseada em JavaScript, adaptada ao estilo do Zabbix.

## 🚀 Instalação

1. **Copie a pasta do Widget:**

   Clone ou copie a pasta `UrlViewer_Zabbix_Widget` para o diretório de widgets do frontend do seu servidor Zabbix. Exemplo de caminho:

   ```bash
   cd /usr/share/zabbix/widgets/
   sudo git clone https://github.com/Redes-Tecnologia/UrlViewer_Zabbix_Widget.git urlviewer
   ```

2. **Atualize o Zabbix Frontend:**

   * Limpe o cache do navegador (Ctrl+F5 ou Ctrl+Shift+R).
   * Caso necessário, reinicie o serviço web (Apache, Nginx, etc).

3. **Adicione o Widget ao Dashboard:**

   * No Zabbix, vá em `Administration` > `General` > `Modules`.
   * Clique em “Scan Directory” para detectar o novo widget.
   * No dashboard desejado, clique em "Editar dashboard" > "Adicionar widget".
   * Procure e selecione "UrlViewer".
   * Configure a URL e salve.

## ⚙️ Como Usar

1. No widget adicionado ao dashboard, insira a URL completa que deseja acessar (ex: `https://grafana.meudominio.local`).
2. Pressione `Enter` ou clique no botão de envio.
3. O site será carregado diretamente dentro do iframe do widget.

> **Importante:** A exibição da URL dependerá de permissões específicas do site alvo:
>
> * **CSP / X-Frame-Options:** O site precisa **permitir ser embutido** em iframes. Sites com `X-Frame-Options: DENY` ou políticas CSP restritivas não serão exibidos.
> * **HTTP/HTTPS:** Se o seu Zabbix estiver usando HTTPS, sites HTTP podem ser bloqueados pelo navegador por motivo de “conteúdo misto”.
> * **Login:** O widget não realiza autenticação automática. Se a URL exigir login, ele deverá ser feito manualmente dentro do iframe.

## 🛡️ Requisitos e Considerações

* **Zabbix:** Recomendado Zabbix 6.0 ou superior.
* **Rede:** O navegador do usuário que acessa o Zabbix deve conseguir acessar a URL inserida.
* **Segurança:** Não inserir URLs externas ou inseguras sem entender os riscos. Este widget não armazena dados nem implementa autenticação.

## 👨‍💻 Desenvolvido por

**Redes Tecnologia**

## 🖼️ Screenshot

(Adicione aqui um print do widget funcionando, após primeiro push no GitHub)
