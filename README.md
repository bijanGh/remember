# I Remember

an open-source project which its goal is too be a repository for a collective or a community consists of posts including an image and a 1024 char length caption. it can also have tags keywords prefixed with `#` in order to be indexed and categorized.
this repository is public and can contain any kind of content, it just need to be a memory; good, bad , beautiful, ugly. it does not matter. it just need to be.
each post image is also optional. you should be able to chain posts together to make a journey. after all life is just a journey.
as of the original idea this place landing should be traversable in 3D space. in order to make a performant 3D space I choose to use the [three.js](https://threejs.org/) library.
we also need to have storage for media files which we are going to use cloudflare R2 storage for that.
framework of choice is [next.js](https://nextjs.org/) in order to hae bacckend and front end in one place. I'm just being lazy.
we also use [typescript](https://www.typescriptlang.org/) for type safety and [tailwindcss](https://tailwindcss.com/) for styling. these choices are made only for easier accessibility and readablity of the code.
we are going to use [immer](https://immerjs.github.io/immer/) for state management because javascript object system is a twoEdged sword.
that will be enough for now.

# Task Management

as im going to do this project all in the open and streamed in twitcch I need to do everything in the IDE and versioned by Git. so we are going to document each task/feature in the the `/tasks.md` file.
