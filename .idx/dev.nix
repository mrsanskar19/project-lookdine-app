{ pkgs, ... }: {
  channel = "stable-25.05";
  
  packages = [ 
    pkgs.nodejs_20 
  ];

  env = { };

  idx = {
    extensions = [
      "msjsdiag.vscode-react-native"
      "echoapi.echoapi-for-vscode"
      "bradlc.vscode-tailwindcss"
    ];

    workspace = {};

    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "npm" "run" "web" "--" "--port" "$PORT" ];
          manager = "web";
        };
      };
    };
  };
}
