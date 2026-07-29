module.exports = {
  apps: [
    {
      name: 'holicindo-api',
      cwd: './backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: { NODE_ENV: 'production', PORT: 3011 },
    },
    {
      name: 'holicindo-web',
      cwd: './frontend',
      script: 'node_modules/.bin/next',
      args: 'start -p 3010',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: { NODE_ENV: 'production', PORT: 3010 },
    },
  ],
};
