import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage(props) {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies").then(
        (res) => {
            setFilmes(res.data)
        }
    )}, [])

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
            {
                filmes.map(
                    (f) => <MovieContainer data-test="movie" to={`/sessoes/${f.id}`}>
                        <img src={f.posterURL} />
                    </MovieContainer>
                )
            }
            </ListContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 320px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 30px;
    margin-top: 60px;
`
const MovieContainer = styled(Link)`
    width: 145px;
    box-sizing: border-box;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 130px;
        height: 190px;
    }
    background: white;
    padding: 8px;
`