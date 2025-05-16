# 📷 Camera Zabbix Widget

Widget para o Zabbix que permite visualizar uma câmera IP diretamente no dashboard.

Este widget foi desenvolvido para facilitar o monitoramento visual de ambientes críticos (como data centers, salas de servidores, entre outros), sem precisar sair da interface de monitoramento do Zabbix.

## ✨ Funcionalidades

* Inserção manual do IP da câmera via formulário.
* Validação de IP básico (IPv4).
* Exibição da interface web da câmera em um iframe.
* Estilo adaptado ao layout do Zabbix.
* Interface simples e leve baseada em JavaScript.

## 🚀 Instalação

1.  **Copie a pasta do Módulo/Widget:**
    Copie a pasta `Camera_Zabbix_Widget` inteira para o diretório de módulos do frontend do seu servidor Zabbix. O local exato pode variar dependendo da sua versão e instalação, mas um local comum é:
    * `/usr/share/zabbix/widgets/camera`
    * `sudo git clone https://github.com/Redes-Tecnologia/Camera_Zabbix_Widget.git camera`

2.  **Atualize o Zabbix Frontend:**
    * Limpe o cache do seu navegador (geralmente Ctrl+F5 ou Ctrl+Shift+R).
    * Em algumas instalações, pode ser necessário reiniciar o serviço do Zabbix Web Server (Apache, Nginx+PHP-FPM) ou limpar o cache interno do Zabbix, se houver.

3.  **Adicione o Widget ao Dashboard:**
    * No frontend, vá até “Administration” > “General” > “Modules”.
    * No canto superior direito, clique em “Scan Directory”.
    * Acesse o dashboard desejado no Zabbix.
    * Clique para "Editar dashboard".
    * Clique em "Adicionar widget".
    * Procure e selecione "Camera" (ou o nome que você definiu como `name` no `manifest.json`).
    * Configure o widget (se houver opções) e salve as alterações no dashboard.

## ⚙️ Como Usar

1.  No widget recém-adicionado ao dashboard, você verá um campo para inserir o IP.
2.  Digite o endereço IP da câmera que deseja visualizar.
3.  Clique no botão "Abrir Câmera" ou pressione `Enter` no campo de IP.
4.  O widget tentará carregar a interface web da câmera no lugar do formulário inicial, dentro de um `iframe`.

> **Nota Importante:** A funcionalidade deste widget depende crucialmente de como a câmera está configurada e das políticas de segurança do navegador:
>
> * **Autenticação:** Funciona melhor com câmeras que **não exigem login/autenticação** via formulário web. Se a câmera exigir login, você terá que fazê-lo *dentro do iframe* a cada recarregamento do widget (como ao trocar de página do dashboard). O widget **não** armazena ou gerencia logins.
> * **Permissão de Iframe:** A câmera **não pode** enviar cabeçalhos HTTP que bloqueiem a incorporação em iframes (como `X-Frame-Options: DENY` ou `X-Frame-Options: SAMEORIGIN`, ou políticas `Content-Security-Policy` restritivas). Se a câmera bloquear iframes, ela não será exibida.
> * **HTTP/HTTPS:** Se o seu Zabbix usa HTTPS, a câmera idealmente também deveria usar HTTPS. Carregar uma câmera HTTP dentro de um Zabbix HTTPS pode ser bloqueado pelo navegador como "Mixed Content".

## 🛡️ Requisitos e Considerações

* **Zabbix:** Recomendado Zabbix 6.0 ou superior (desenvolvido e testado em contexto de 6.x).
* **Câmera:** Câmera IP com interface web acessível via HTTP ou HTTPS.
* **Rede:** Acesso de rede direto entre o *navegador do usuário* que está visualizando o dashboard Zabbix e o endereço IP da câmera.
* **Segurança:** Não recomendado para câmeras em redes públicas ou inseguras, especialmente se não exigirem autenticação. Este widget não adiciona camadas de segurança.
* **Limitações:** Conforme a nota em "Como Usar", a exibição depende da configuração da câmera (autenticação, permissão de iframe) e das políticas de segurança do navegador.

## 👨‍💻 Desenvolvido por

Redes Tecnologia

## 📷 Screenshot

![image](https://github.com/user-attachments/assets/1fd0c2a3-c0b4-4251-80b6-7fbc45d20a2f)

