# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
channel = "stable-24.05";
  # Use https://search.nixos.org/packages to find packages
  packages = [ pkgs.nodejs_20 ];
  # Sets environment variables in the workspace
  env = {  };
  
  packages = [ 
    pkgs.nodejs_20 
    pkgs.nodePackages.expo-cli
  ];

  env = { };

idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
extensions = [
"msjsdiag.vscode-react-native"
"echoapi.echoapi-for-vscode"
"bradlc.vscode-tailwindcss"
];

workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
onCreate = {
        install = "npm install";
};
};
    # Enable previews and customize configuration

previews = {
enable = true;
previews = {
@@ -39,11 +36,10 @@
manager = "web";
};
android = {
          # noop
command = [ "tail" "-f" "/dev/null" ];
manager = "web";
};
};
};
};
}
}
