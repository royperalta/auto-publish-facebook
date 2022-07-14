const config =  {}
config.dominio = "https://radioondapopular.com/wp-json/wp/v2";
config.categoria = 38;
config.getPosts = `${config.dominio}/posts?categories=${config.categoria}`;

export default config