import daybookRouter from "@/modules/daybook/router";

describe("Pruebas en el router module del Daybook", () => {
    test("el router debe de tener esta configuracion", async() => {
        expect(daybookRouter).toMatchObject({
            name: "daybook",
            component: expect.any(Function),
            children: [{
                    path: "",
                    name: "no-entry",
                    component: expect.any(Function),
                },
                {
                    path: ":id",
                    name: "entry",
                    component: expect.any(Function),
                },
            ],
        });

        // expect((await daybookRouter.children[0].component()).default.name).toBe(
        //     "NoEntrySelected"
        // );
        // expect((await daybookRouter.children[1].component()).default.name).toBe(
        //     "EntryView"
        // );

        const promiseRoutes = [];
        daybookRouter.children.forEach((child) =>
            promiseRoutes.push(child.component())
        );

        const routes = (await Promise.all(promiseRoutes)).map(
            (r) => r.default.name
        );

        expect(routes).toContain("NoEntrySelected");
        expect(routes).toContain("EntryView");
    });

    test("debe de retornar el ID de la ruta", () => {
        const route = {
            params: {
                id: "ABC-123",
            },
        };

        // expect(daybookRouter.children[1].props(route)).toEqual({ id: "ABC-123" });

        const entryRoute = daybookRouter.children.find(
            (route) => route.name === "entry"
        );

        expect(entryRoute.props(route)).toEqual({ id: "ABC-123" });
    });
});