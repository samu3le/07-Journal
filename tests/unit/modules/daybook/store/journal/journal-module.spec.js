import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {
                    ...initialState,
                },
            },
        },
    });

describe("Vuex- Pruebas en el Journal Module", () => {
    test("este es el estado inicial, debe de tener este state", () => {
        const store = createVuexStore(journalState);

        const { isLoading, entries } = store.state.journal;

        expect(isLoading).toBeFalsy();
        expect(entries).toEqual(journalState.entries);
    });

    test("mutation: setEntries", () => {
        const store = createVuexStore({ isLoading: true, entries: [] });

        store.commit("journal/setEntries", journalState.entries);

        expect(store.state.journal.entries.length).toBe(2);
        expect(store.state.journal.isLoading).toBeFalsy();
    });

    test("mutation: updateEntry", () => {
        const store = createVuexStore(journalState);

        const updateEntry = {
            id: "-MnEY8laYQCfABuoUgYz",
            date: 1635569663798,
            text: "Hola Mundo desde pruebas",
        };

        store.commit("journal/updateEntry", updateEntry);
        const storeEntries = store.state.journal.entries;
        expect(storeEntries.length).toBe(2);

        expect(storeEntries.find((e) => e.id === updateEntry.id)).toEqual(
            updateEntry
        );
    });

    test("mutation: addEntry deleteEntry", () => {
        const store = createVuexStore(journalState);

        const addEntry = {
            id: "ABC-123",
            text: "Hola Mundo",
        };

        store.commit("journal/addEntry", addEntry);

        const storeEntries = store.state.journal.entries;
        expect(storeEntries.length).toBe(3);

        expect(storeEntries.find((e) => e.id === addEntry.id)).toBeTruthy();

        store.commit("journal/deleteEntry", addEntry.id);

        expect(store.state.journal.entries.length).toBe(2);
        expect(
            store.state.journal.entries.find((e) => e.id === addEntry.id)
        ).toBeFalsy();
    });

    // Getters Test

    test("getters: getEntriesByTerm getEntryById", () => {
        const store = createVuexStore(journalState);

        const [entry1, entry2] = journalState.entries;

        expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
        expect(store.getters["journal/getEntriesByTerm"]("app").length).toBe(1);

        expect(store.getters["journal/getEntriesByTerm"]("app")).toEqual([entry2]);

        expect(store.getters["journal/getEntryById"](entry1.id)).toEqual(entry1);
    });

    //actions

    test("actions: loadEntries ", async() => {
        const store = createVuexStore({ isLoading: true, entries: [] });

        await store.dispatch("journal/loadEntries");

        expect(store.state.journal.entries.length).toBe(2);
    });

    test("actions: updateEntry ", async() => {
        const store = createVuexStore(journalState);

        const updateEntry = {
            id: "-MnEY8laYQCfABuoUgYz",
            date: 1635569663798,
            text: "Entrada actualizada desde Mock data",
            otroCampo: true,
            otroMas: { a: 1 },
        };

        await store.dispatch("journal/updateEntry", updateEntry);

        expect(store.state.journal.entries.length).toBe(2);
        expect(
            store.state.journal.entries.find((e) => e.id === updateEntry.id)
        ).toEqual({
            id: "-MnEY8laYQCfABuoUgYz",
            date: 1635569663798,
            text: "Entrada actualizada desde Mock data",
        });
    });

    test("actions: createEntry deleteEntry ", async() => {
        const store = createVuexStore(journalState);

        const newEntry = {
            date: 1635569663798,
            text: "Nueva entrada desde Test",
        };

        const id = await store.dispatch("journal/createEntry", newEntry);

        expect(typeof id).toBe("string");

        expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

        await store.dispatch("journal/deleteEntry", id);

        expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
    });
});