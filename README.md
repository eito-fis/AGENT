# [DRL](https://d1fsgorx82bxhr.cloudfront.net)
> A webapp that empowers users to get started with reinforcement learning instantly.

Website live at: https://d1fsgorx82bxhr.cloudfront.net

Devpost at https://devpost.com/software/drl

<p align="center">
  <img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/397/531/datas/gallery.jpg" />
</p>

## App Screenshots
<table align="center">
  <tr>
    <th>Front Page</th>
    <th>Agent-Environment Tab</th>
    <th>Metrics Tab</th>
    <th>Visualization Tab</th>
  </tr>
  <tr>
    <td><img width="300em" src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/397/531/datas/gallery.jpg" alt="Front Page" /></td>
    <td><img width="300em" src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/397/529/datas/gallery.jpg" alt="Agent-Environment Tab" /></td>
    <td><img width="300em" src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/397/592/datas/gallery.jpg" alt="Metrics Tab" /></td>
    <td><img width="300em" src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/397/552/datas/gallery.jpg" alt="Visualization Tab" /></td>
  </tr>
</table>

## Installation

First, clone the application
```bash
git clone https://github.com/eito-fis/AGENT.git
```

Then, go into the AGENT folder
```bash
cd AGENT
```

Then, install the application dependencies
```bash
npm install
```

Finally, start the application
```bash
npm start
```

## What it does
When a user enters the website, they are met with two drop-down menus that allows them to select the algorithm they want to try out, and what game they want to learn to play. After this, all is set to start training. Our user can start training their first state-of-the-art RL player with as little as three mouse clicks! A TensorFlow JS backend ensures fast and efficient training that users can follow in the "Results" tab. Finally, the "Visualization" tab allows users to watch the algorithm play and improve at the game, giving them a window into how the algorithm learns. With five mouse clicks, the user has gone through a complete RL workflow!

## What's next for DRL
This is just the beginning of what has everything to become a powerful education tool! Our next step is to implement more environments and state-of-the-art algorithms, to give the user a more complete experience of the current state of RL. In parallel with these algorithms, we also plan on writing a documentation page explaining each of them in an intuitive way, while also providing references for further reading.

Another feature that we are stoked about is giving the user the ability to modify existing environments and see how that affects the agent. We also want to give the user the chance of interacting directly with the environments, and playing against the agent when possible. By interacting with the agent, users will get a better sense of how their chosen algorithm behaves and how powerful RL can be.

Finally, to cater to a more academic audience (Ph.D. students, freelance researchers, or just curious people), we also plan on including an option to automatically generate a Python script that uses standard RL libraries (OpenAI Gym, Garage) to duplicate what the user has just done in the browser. We hope that this feature will help lower the entry barrier for users interested in starting their own RL research, but who are discouraged by the entry barriers associated with working with the standard libraries.
