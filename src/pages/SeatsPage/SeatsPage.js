import { useEffect, useState } from "react"
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function SeatsPage(props) {

  const [assentos, setAssentos] = useState({seats: [], movie:{title: "", posterURL: ""}, day:{weekday: "", date:""}});
  const [selecionados, setSelecionados ] = useState([]);
  const { idSessao } = useParams();
  const [form, setForm] = useState({name: "", cpf: ""});
  const navigate = useNavigate();

   useEffect(() => {
            axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
            .then(
                (res) => {setAssentos(res.data)}
            )
   }, [])

   function controlarformulario(e){
       let newobj = form;
       newobj[e.target.name] = e.target.value;
       setForm([...newobj])
   }

   function reservarassentos(e){
    e.preventDefault();
    if(selecionados.length > 0){
        let enviar={...form, ids: selecionados}
        console.log(enviar);
        axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", enviar)
        .then(
            (res) => {navigate("/sucesso")}
        )
        .catch(
            () => {console.log("Error")}
        )
        
    }
   }


    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.seats.map(
                    (assento) => 
                    <SeatItem 
                    selecionados={selecionados} 
                    setSelecionados={setSelecionados}
                    isAvailable={assento.isAvailable}   
                    name={assento.name}
                    id={assento.id}
                    />
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reservarassentos}>
                Nome do Comprador:
                <input onClick={controlarformulario} name="name" placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input onClick={controlarformulario} name="cpf" placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={assentos.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{assentos.movie.title}</p>
                    <p>{assentos.day.weekday} - {assentos.day.date}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem2 = styled.div`
    border: 1px solid ${"blue"};         // Essa cor deve mudar
    background-color: ${props => !(props.isAvailable) ? "#FBE192" :(props.selecionados.includes(props.id) ? "#1AAE9E" : "#C3CFD9")};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const SeatItem = (props) => {
    

    function controlarassento(e){
  
        if(props.isAvailable){
            if(props.selecionados.includes(props.id)){
                let filtrado = props.selecionados.filter(s => !(s === props.id));
                props.setSelecionados([...filtrado]);
                console.log(filtrado);
              }
              else{
                props.setSelecionados([...props.selecionados, props.id])
                console.log([...props.selecionados, props.id])
                
              }
        }
        
     }

    return(
        <SeatItem2
        onClick={controlarassento} 
        isAvailable={props.isAvailable} 
        id={props.id}
        selecionados={props.selecionados}
        >
            {props.name}
        </SeatItem2>
    )
}
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`