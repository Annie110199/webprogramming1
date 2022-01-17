package lab1;

import java.io.*;
import java.net.Socket;

public class lab1 {
    public static void getServerInfo(String server, String filePath, int port) throws IOException {
        try (Socket socket = new Socket(server, port)) {
            OutputStream outStream = socket.getOutputStream();
            InputStream inStream = socket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inStream));
            PrintWriter writer = new PrintWriter(new BufferedOutputStream(outStream));
            Event event = Event.HEADERS;
            writer.print("GET / HTTPS/1.1\nHost:" + server + "\n\n");
            writer.flush();
            String str = reader.readLine();
            try (PrintWriter printWriter = new PrintWriter(new BufferedOutputStream(new FileOutputStream(filePath)))) {
                while (str != null) {
                    if (event == Event.HEADERS)
                        System.out.println(str);
                    if (event == Event.HEADERS && "".equals(str))
                        event = Event.BODY;
                    if (event == Event.BODY)
                        printWriter.println(str);
                    str = reader.readLine();
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        int port = 80;
        String server = "omsu.ru";
        String filePath = "SocketLog.html";
        getServerInfo(server, filePath, port);
    }
}
