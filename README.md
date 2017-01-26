# openwhisk-git-to-email

This OpenWhisk action allows you to process a Github Webhook for a push event and sends out an email.

# Create th trigger
Get an access token for Github and create the trigger
```
$ wsk trigger create apache-openwhisk-github-commits -f /whisk.system/github --param username myGitUser --param repository myGitRepo --param accessToken aaaaa1111a1a1a1a1a111111aaaaaa1111aa1a1a
```

# Create the action
```
$ wsk action create email-commits action.js -p email_username "apacheopenwhisk@example.com" -p email_password 1234abcd -p email_to "commits@openwhisk.apache.org"
```

# Create the rule
```
$ wsk rule create openwhisk-team-git-email-commits apache-openwhisk-github-commits email-commits
```

More information about Github trigger read the [docs](https://github.com/openwhisk/openwhisk/blob/master/docs/catalog.md#using-the-github-package)

License: Apache-2.0