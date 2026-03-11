const cp = require('child_process');
const fs = require('fs');

['HEAD', 'HEAD~1', 'HEAD~2', 'HEAD~3', 'HEAD~4', 'HEAD~5'].forEach((r, i) => {
    try {
        const out = cp.execSync(\`git show \${r}:src/app/events/page.js\`).toString('utf8');
        fs.writeFileSync('old' + i + '.js', out);
    } catch(e) {
        console.error('Error for ' + r);
    }
});
