module.exports = {
  ci: {
    collect: {
      url: [
        'http://127.0.0.1:3177/',
        'http://127.0.0.1:3177/projects',
        'http://127.0.0.1:3177/kalia',
        'http://127.0.0.1:3177/writing/tarka-sabha-council',
      ],
      numberOfRuns: 1,
      startServerCommand: 'npm run start -- --hostname 127.0.0.1 --port 3177',
      startServerReadyPattern: 'Ready',
      settings: { preset: 'desktop' },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
