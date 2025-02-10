const searchSelectCSS = `
.search-select-wrapper {
    & * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    font-family: sans-serif;
    font-size: 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    position: relative;
    transition: border-radius var(--trans_SM) var(--transD_0), box-shadow var(--trans_MD) var(--transD_0);

    & .search-select-heading {
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        background-color: #fff;
        box-shadow: 0 6px 6px 1px #0002;
        @media (prefers-color-scheme: dark) {
            background-color: #000;
        }

        &:hover .search-select-opener {
            background-color: #0bf;
            @media (prefers-color-scheme: dark) {
                background-color: #777;
            }
            
        }
    }
    & .search-select-title {
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
        color: #555;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:placeholder {
            color: #999;
        }
        @media (prefers-color-scheme: dark) {
            color: #ccc;
            &:placeholder {
                color: #999;
            }
        }
    }
    & .search-select-opener {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #abf;
        width: 1.25rem;
        min-width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.25rem;
        color: #000;
        @media (prefers-color-scheme: dark) {
            background-color: #555;
            color: #fff;
            &:hover {
                background-color: #777;
            }
        }
        & svg {
            width: 0.5rem;
            height: 0.5rem;
            transition: transform var(--trans_SM) var(--transD_0);
            color: #000;
            @media (prefers-color-scheme: dark) {
                color: #fff;
            }
        }
        &:hover {
            background-color: #0bf;
            @media (prefers-color-scheme: dark) {
                background-color: #05a;
            }
        }
    }
    & .search-select-input-container {
        width: 100%;
        height: 1.5rem;
        display: none;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0 0.5rem;
        opacity: 0;
        transition: opacity var(--trans_LG) var(--transD_MD) ;
        &[filtered="true"] {
            display: flex;
        }
    }
    & .search-select-input {
        background-color: transparent;
        border: none;
        width: 100%;
        height: 100%;
        padding: 0 0.5rem;
        &:focus {
            outline: none;
        }
        @media (prefers-color-scheme: dark) {
            color: #fff;
        }
    }
    & .search-select-content {
        position: absolute;
        top: 2rem;
        left: 0;
        width: 100%;
        height: 0px;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.5rem 0;
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        background-color: #fff;
        box-shadow: 0 6px 6px 1px #0002;
        visibility: hidden;
        opacity: 0;
        transform: scale(1,0) translateY(-5rem);
        transition: transform var(--trans_MD) var(--transD_SM), visibility var(--trans_SM) var(--transD_0), height var(--trans_SM) var(--transD_SM) ease-in-out, opacity var(--trans_LG) var(--transD_SM) ease-in-out;
        @media (prefers-color-scheme: dark) {
            background-color: #000;
        }
        & .search-select-scrollable {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            &::-webkit-scrollbar { display: none; }
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar { display: none; }
            padding: 0.5rem 0;
            min-height: 2rem;
            & .search-select-list, 
            & .search-select-selecteds {
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
            }
            & .search-select-option {
                cursor: pointer;
                padding: 0.125rem 1rem;
                color: #fff;
                transition: background-color var(--trans_MD) ease-in-out, color var(--trans_MD) ease-in-out;
                &:hover {
                    background-color: #0bf;
                    color: #000;
                }
                &[filtered="true"] {
                    display: none;
                }
            }
            & .search-select-list .search-select-option {
                &[selected="true"] {
                    display: none;
                }
            }
            & .search-select-selecteds .search-select-option {
                background-color: #fd5;
                color: #000;
                &:hover {
                    background-color: #f80;
                    color: #000;
                }
            }
        }
    }

    &[open="true"] .search-select-heading {
        border-radius: 0.5rem 0.5rem 0 0;
        box-shadow: 0 0 0 0 #0000;
    }
    &[open="true"] .search-select-input-container {
        opacity: 1;
    }
    &[open="true"] .search-select-content {
        transform: scale(1,1) translateY(0rem);
        visibility: visible;
        height: 250px;
        opacity: 1;
    }
    &[open="true"] .search-select-opener svg {
        transform: scale(1,-1);
    }
}
`

export default searchSelectCSS