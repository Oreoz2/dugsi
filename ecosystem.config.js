module.exports = {
    apps: [
        {
            name: "dugsi-platform",
            script: "npm",
            args: "start",
            cwd: "./apps/src",
            instances: "max",
            exec_mode: "cluster",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
