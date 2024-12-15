# RxJs Store POC 🧪

Lately I've been using a lot the package `@ngrx/component-store` 📦. It's a really nice package because it allows to use the
Redux pattern but is very lightweight and is meant to be used to manage local state instead of global state. But I was 
curious about how it worked deep down 🤔, so I checked out the source code. I am not really a library developer, and maybe I 
am in no position to judge. But after reading the code for a while, it was kinda messy. It had tons of
different paths in each function, a lot of generics and overrides I really don't see necessary 🤷‍♂️. So I created
this **Proof Of Concept** to make a way simpler, minimalist and understandable "local store" with only RxJs.

I am not saying this is like a replacement or something, this is just a really really basic implementation. It is inspired
in some stuff from the original library but also other stuff that made more sense to me, like for example:

- Using a `BehaviorSubject` instead of a `ReplaySubject`.
- Making the **"base class"** `abstract` instead of a normal service (I know it may be convenient to inject the store directly
in a component, but on the other side I believe that this should **always** be abstracted to a service).
- Remove all that logic that allows to pass observables instead of the values for almost all the functions (I don't really see
where this could be useful).
- Remove the huge amount of flexibility that the `select` function has. In the original library this function has like a thousand overrides
and some are nice, but also it gets really messy. It would be way simpler if we set one standard and the library users should
stick to it.

##### File structure:

- [Base Store (`rxjs-store.ts`)](./src/app/rxjs-store/rxjs-store.ts)
- [Service that implements the store (`posts-store.service.ts`)](./src/app/rxjs-store/posts-store.ts)
- [Base component that uses the service (`app.component.ts`)](./src/app/app.component.ts)

To conclude, it was an interest exercise. Clearly here I am not following like "good practices" in the consumption of the store, 
or with tests, or naming, or linting. But the main goal of this repo I think was accomplished, and it was to understand how this works
under the ground. Also, it will be useful to the future me for when I enter a project in which I can't install any extra dependencies
but still want to follow this pattern for local state management.
