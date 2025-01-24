## Modifying Hosts File

To access your development environment using a custom domain, you'll need to modify your hosts file.

### macOS/Linux

```bash
sudo vim /etc/hosts
```

Add the following line:

```
127.0.0.1  potato.local
127.0.0.1  tomato.local
```

### Windows

`C:\Windows\System32\drivers\etc\hosts`

Add the following line:

```
127.0.0.1  potato.local
127.0.0.1  tomato.local
```

### Running the app

On the project root folder run `docker compose up` and on other terminal `npm start`.

On the first run should generate the nginx and express images and start the containers.

### Explanation

#### Backend

The backend exists just to simulate getting some information from the server using the `provideAppInitializer`.

Some information should be retrieved from the server before starting loading the app because it's a multi tenant app.

The generation of the url to do such a request needs to be dynamic based on the request on the SSR backend and on the location on the browser.

#### NGINX

To make development easy and better debug production bugs.

Allows to have all clients domains configured at the same time instead and check for bugs simultaneously instead of one per time using localhost.
