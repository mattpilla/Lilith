const md = new window.markdownit();

new Vue({
    el: '#app',
    data: {
        commands: []
    },
    created() {
        this.commands = commands.map(command => {
            command.description = md.renderInline(command.description);
            return command;
        });
    }
});
