import { Routes } from '@angular/router';
import { CestaComponent } from './cesta/cesta.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DadosClienteComponent } from './dadosCliente/dadosCliente.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PedidoComponent } from './pedido/pedido.component';

export const routes: Routes = [
    {path:"cesta", component: CestaComponent},
    {path:"dadosCliente", component: DadosClienteComponent},
    {path:"pesquisa", component:PesquisaComponent},
    {path:"detalhe", component: DetalheComponent},
    {path:"cadastro", component:CadastroComponent},
    {path:"vitrine", component:VitrineComponent},
    {path:"", component:VitrineComponent},
    {path:"login", component:LoginComponent},
    {path:"logout", component:LogoutComponent},
    {path:"pedido", component:PedidoComponent}
];
