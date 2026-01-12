{ pkgs, ... }: {
  channel = "stable-25.05";
  
  packages = [ 
    pkgs.nodejs_20 
    pkgs.jdk17
    pkgs.nodePackages.expo-cli
  ];

  env = { };

  idx = {
    extensions = [
      "msjsdiag.vscode-react-native"
      "echoapi.echoapi-for-vscode"
      "bradlc.vscode-tailwindcss"
    ];

    workspace = {
      onCreate = {
        install = "npm install";
      };
      onStart = {
        android = ''
          adb wait-for-device
          npm run android -- --tunnel
        '';
      };
    };

    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "npm" "run" "web" "--" "--port" "$PORT" ];
          manager = "web";
        };
        android = {
          command = [ "tail" "-f" "/dev/null" ];
          manager = "web";
        };
      };
    };
  };
}
