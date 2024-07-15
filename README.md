# :trophy: Identity Tech Challenge

Your goal is to build a sample full-stack app with a functionally-complete identity management layer.

- [Restrictions](#hear_no_evil-restrictions)
- [Getting started](#star2-getting-started)
- [Desired features](#clipboard-desired-features)
- [Submitting your app](#checkered_flag-submitting-your-app)
- [FAQ's](#question-faqs)

## :hear_no_evil: Restrictions

We need a consistent framework to evaluate your work fairly, so please abide by the following rules:

1.  Build your app using the included [Next.js](https://nextjs.org/) + [Docker Compose](https://docs.docker.com/compose/) scaffold.
2.  Stick with vanilla **JavaScript**, not a compiled language such as TypeScript or Elm.
3.  **Roll your own authentication.**  No reaching for [Passport](https://classic.yarnpkg.com/en/package/passport) or any other prebuilt auth library.

Outside of that, you can take the app in any direction you like, with any auth strategy that you prefer. :thumbsup:

## :star2: Getting started

First clone this repo, and then run the following in your terminal:

```
docker-compose up -d --build
```

Then visit http://localhost:3000 in your browser.

## :clipboard: Desired features

Please **check the box** for each one that you implement to help us know what to look out for.

### :white_check_mark: Bare minimum:
- [ ] Sign up a new user
- [ ] Login an existing user
- [ ] Logout a user

### :heart_eyes: Bonus points:
- [ ] Use a Postgres database
- [ ] Auto-login after signup
- [ ] Allow user profile updates
- [ ] Authorize pages and API endpoints
- [ ] Add request logging
- [ ] Clean PII from logs
- [ ] Make it look pretty with SCSS modules
- [ ] Add an admin page to manage users
- [ ] Enforce 2FA *

\* **Note:** Multiple 2FA strategies exist.  If you choose to implement one that "sends" a code by email or text, you can emulate that by logging the code to your local terminal.  _(No need to pay real :dollar: to complete this challenge. :sweat_smile:)_

## :checkered_flag: Submitting your app
1.  Feel free to **push directly to a new branch on this repo** as you work on your solution.  Consider it your personal sandbox. 👍
1.  Github Classroom will autogenerate a "review PR" for you branch.  **Please DON'T merge that.**
1.  When you're ready to submit your solution, **send a link for your branch** to the recruiter.
1.  Our team will **review your solution** within a few days.
1.  Aftward, we will **follow-up with you** to talk about next steps.

## :question: FAQ's

> Q: Can I ask questions about the challenge?<br/>
> A: Always.

> Q: Can I use \<insert npm library name here\>?<br/>
> A: Yes, but please still roll your own authentication layer.

> Q: Can I use a database other than Postgres?<br/>
> A: We use multiple datastores in our apps, and we try to use the best one for the situation at hand.  But we use Postgres A LOT.  To help us evaluate consistently, if you choose to use a database, please stick with Postgres.

> Q: How can I add Postgres to my app quickly?<br/>
> A: Uncomment the related lines in the `docker-compose.yml`, and you'll have a functioning Postgres instance to play with immediately.

> Q: Why Next.js?<br/>
> A: Because we already use it in-house, and because it allows you to show-off your mad full-stack skills all in one place.
