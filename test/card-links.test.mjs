import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCard,validateCardArgs,Cards} from '../src/cards.mjs';

test('renders safe link buttons together with callback choices',()=>{
 const args={title:'Source',body:'Open the project',choices:['OK'],input:false,links:[{label:'GitHub',url:'https://github.com/doudou0o/Slo-Buddy'}]};
 validateCardArgs(args);const card=buildCard(args,'id');
 assert.equal(card.elements[1].actions[0].value.buddy_card,'id');assert.equal(card.elements[2].actions[0].url,args.links[0].url);
 for(const url of ['javascript:alert(1)','http://example.com','https://user:pass@example.com'])assert.throws(()=>validateCardArgs({...args,links:[{label:'bad',url}]}));
});
test('link buttons survive a valid callback update',()=>{
 const args={title:'Source',body:'Choose',choices:['OK'],input:false,links:[{label:'GitHub',url:'https://github.com/doudou0o/Slo-Buddy'}],user:'owner',chat:'chat',messageId:'message',at:Date.now(),status:'pending'};
 const store={data:{cards:{id:args},groups:[]},save(){}};const cards=new Cards({store,api:{},bot:{botOpenId:'bot',accept(){}}});
 const result=cards.handle({action:{value:{buddy_card:'id',choice:0}},operator:{open_id:'owner'},context:{open_chat_id:'chat',open_message_id:'message'}});
 assert.equal(result.card.data.elements[1].actions[0].url,args.links[0].url);
});
