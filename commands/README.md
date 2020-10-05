# Commands
Message commands are placed in this directory, with the filename being `<command name>.js`.\
Files export an object with the following:
Property | Type | Optional | Default | Description
-------- | ---- | -------- | ------- | -----------
name | string | no | none | command name
usage | string | yes | none | if `test` fails, print this string after the command name to demonstrate usage
examples | array\<string\> | yes | none | if `test` fails, print this list of example arguments
guildOnly | boolean | yes | false | if true, command must not be sent via DM
exact | boolean | yes | false | if true, requires that no arguments are given

An `execute` function must also be exported, which is the function the command executes. It has the following parameters:
Parameter | Type | Optional | Default | Description
--------- | ---- | -------- | ------- | -----------
message | string | no | none | the full message that triggered the command
args | array | yes | none | the arguments that come after the command

A `test` function may optionally be exported, which tests the arguments to see if the user executed the command properly. It takes in the same `args` parameter as `execute`. If this test passes, the command will execute. Otherwise, `usage` and/or `examples` will be printed if supplied.
