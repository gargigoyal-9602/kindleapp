import React, { useRef } from "react";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import StorageProvider from "../../../framework/src/StorageProvider.web";
import { RouteProps, RouteComponentProps } from "react-router-dom";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Customizable Area End
import * as Yup from "yup";
export const configJSON = require("./config");
import moment from "moment";

// export interface Props {
//   navigation: any;
//   id: string;
//   classes: any;

//   // Customizable Area Start
//   // Customizable Area End
// }

export type Props = {
  authToken: any;
  classes: any;
  mode: any;
  setTheme: any;
} & RouteProps &
  RouteComponentProps &
  withAlertBoxProps &
  withToastProps &
  withLoaderProps & {
    id: string;
  };
export interface S {
  // Customizable Area Start
  setPublic :any
  arrayHolder: any;
  allBooks: any;
  myBooks: any;
  notesViewMore: any;
  Loader: any;
  allNotes: any;
  authToken: any;
  bookDetailId: any;
  bookDetail: any;
  searchInput: any;
  searchedBooks: any;
  searchedMyBooks:any;
  accountInfo: any;
  ProfileValidationSchema: any;
  order_id: any;
  availablePackages: any;
  myPackages:any;
  toggleMonth: boolean;
  selectedPackage: any;
  viewAll: boolean;
  bestSeller: any;
  playBackSpeed: any;
  getMonth: any;
  analytics: any;
  chartValue: any;
  viewNotes: boolean;
  toggleMenu: boolean;
  readSetModal: boolean;
  selectedWeight: any;
  selectedSize: any;
  selectedColor: any;
  changeSetting: any;
  createNotes:any;
  bookReadId:any;
  activeCart:any
  notesAvailable:any;
  editNotes:boolean;
  bookNotes :any;
  bookNoteId:any
  bookFinished:any,
  noteText:any,
  location:any,
  displayChap: boolean,
  chaptersListing :any,
  currentChapterName: any;
  currentChapterNo :any;
  AllNotesForPurchased:any;
  BookNotesForPurchased:any;
  buyNotesUser:any;
  renditionRef :any;
  renditionRefChap:any;
  book:any;
  purchasedNotes:any;
  purchasedNotesPreview:any;
  product_rating:any;
  upload_note:boolean;
  note_id:any;
  is_playing:any;
  returnBookId:any;
  booksChecked:any
  // Customizable Area End
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  getProductApiCallId: any;
  GetAllBooksApiCallId: string = "";
  myBooksApiCallId: string = "";
  getAllNotesApiCallId: string = "";
  getBookDetailApiCallId: string = "";
  postSearchBookApiCallId: string = "";
  putUpdateProfileApiCallId: string = "";
  postCreateCartApiCallId: string = "";
  getActiveCartApiCallId: string = "";
  getBuyPackagesApiCallId: string = "";
  getBestSellerBooksApiCallId: string = "";
  getAnalyticsApiCallId: string = "";
  getEarningsApiCallId: string = "";
  postCreateNotesApiCallId:string ="";
  showNotesApiCallId :string ="";
  getNoteTextApiCallId :string ="";
  putEditNoteTextApiCallId :string="";
  deleteNoteTextApiCallId:string ="";
  putEditBookNoteApiCallId:string ="";
  deleteBookNoteApiCallId :string ="";
  getAllNotesForPurchasedApiCallId:string ="";
  getBookNotesForPurchasedApiCallId : string="";
  buynotesUserApiCallId:string ="";
  getpurchasedNotesApiCallId:string="";
  getpurchasedNotesPreviewApiCallId:string ="";
  postProductReviewApiCallId:string=""
  lineChart: any;
  postRefundBookApiCallId:string=""
  getMyPackagesApiCallId:string=""
  postaddPackageBooksApiCallId:string=""
  postCancelBookPassApiCallId:string=""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    let ProfileValidationSchema = {
      fullName: Yup.string().required(configJSON.errorNameEmpty),
      email: Yup.string().required(configJSON.errorNameEmpty),
      // .email(configJSON.errorEmailValidation)
    };

    this.state = {
      arrayHolder: [],
      allBooks: "",
      returnBookId:"",
      myBooks: "",
      notesViewMore: true,
      Loader: false,
      allNotes: "",
      authToken: "",
      bookDetailId:
        window.location.pathname ==
          `/Catalogue/BookDetails/${
            window.location.pathname.split("/")[3]
          }` && window.location.pathname.split("/")[3],
      bookReadId : window.location.pathname ==
          `/book-read/${
            window.location.pathname.split("/")[2]
          }` && window.location.pathname.split("/")[2],
      bookDetail: "",
      searchInput: null,
      searchedBooks: "",
      searchedMyBooks:"",
      accountInfo: "",
      ProfileValidationSchema: ProfileValidationSchema,
      order_id: "",
      availablePackages: "",
      myPackages:"",
      toggleMonth: true,
      selectedPackage: "",
      viewAll: false,
      bestSeller: "",
      playBackSpeed: "1",
      getMonth: moment(new Date()),
      analytics: "",
      chartValue: "",
      viewNotes: false,
      toggleMenu: false,
      readSetModal: false,
      selectedWeight:
        (this.state?.changeSetting && this.state.changeSetting.fontWeight) ||
        200,
      selectedSize:
        (this.state?.changeSetting && this.state.changeSetting.fontSize) ||
        16,
      selectedColor:
        (this.state?.changeSetting && this.state.changeSetting.backColor) ||
        "#fff",
      changeSetting: "",
      createNotes:false,
      activeCart:"",
      notesAvailable:"",
      editNotes: false,
      bookNotes:"",
      bookNoteId:"",
      note_id:"",
      bookFinished:false,
      noteText:"",
      location:"",
      displayChap:false,
      chaptersListing :"",
      currentChapterName :"",
      currentChapterNo:"",
      AllNotesForPurchased:"",
      BookNotesForPurchased:"",
      buyNotesUser:"",
      renditionRef:React.createRef(),
      renditionRefChap: React.createRef(),
      setPublic:false,
      book:"",
      purchasedNotes:"",
      purchasedNotesPreview:"",
      product_rating:"",
      upload_note:false,
      is_playing:false,
      booksChecked:[]
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  componentDidMount = async () => {
    const authToken = await StorageProvider.get("authToken");
    const search = await StorageProvider.get("search");
    const accountInfo = await StorageProvider.get("accountInfo");
    const orderId = await StorageProvider.get("orderId");
    const customize = await StorageProvider.get("customize");
    const location = window.location.pathname
        

    if (authToken) {
      if(customize){
       this.setState({
      changeSetting: JSON.parse(customize),
      });
    }
      this.setState({
        accountInfo: JSON.parse(accountInfo),
      });
      this.setState({ authToken }, () => {

         this.getActiveCart();
        this.gettingOrderID();
        console.log(location.split('/')[1] ==="Rating")
        location.split('/')[1] ==="Rating" && this.getbuynotesUser()
        location === "/purchasedNotes" && this.getpurchasedNotes()
        location.split("/")[1] == "purchasedNotePreview" && this.getpurchasedNotesPreview()
        location === "/Catalogue/Home" && this.getAllNotesForPurchased();
        location == "/buyNotes" && this.getAllNotesForPurchased();
        location == "/Catalogue/Home" && this.getAllBooks();
        location == "/view-allBooks" && this.getAllBooks();
        location == `/Catalogue/BookDetails/${location.split("/")[3]}` && this.getAllBooks();         
        location == "/Catalogue/MyBooks" && this.myBooks();
        location.split("/")[1] == "booknotes" && this.getNoteText(location.split("/")[2]);
        location == "/view-allBooks" &&
          this.getBestSellerBooks();
          location.split("/")[1] == "package-books" && this.getAllBooks();
          location.split("/")[1] == "package-books" &&
          this.getBestSellerBooks();
          location.split("/")[1] == "package-books" && (
            toast.warning(`Please Select Any ${location.split("/")[2]} Books`)
          )
        location == "/Catalogue/MyNotes" && this.getAllNotes();
        location ==
          `/Catalogue/BookDetails/${location.split("/")[3]}` &&
          this.getBookDetail();
          location ==
          `/book-read/${location.split("/")[2]}` && (
          this.getBookDetail(),
          this.getShowNotes(`${location.split("/")[2]}`)
          )
          
          location.split("/")[1] ==
          `viewMynotes` && 
          this.getShowNotes(location.split("/")[2])
          location.split("/")[1] ==
          `purchasedNoteView` && 
          this.getbuynotesUser()
          
        location == `/Catalogue/MyEarnings` &&
          (this.getAnalytics(),
          this.postEarnings(this.state.getMonth),
          //@ts-ignore
          this.createChart());
          location.split("/")[1] ==
          `buyNotesPreview` && 
          this.getBookNotesForPurchased()
          
          location.split("/")[1] ==
          `buyNotesPurchase` && 
          this.getbuynotesUser()
        location == "/BuyPackages" &&
          // JSON.parse(accountInfo).attributes.have_package &&
          this.getBuyPackages();
          location == "/MyPackages" && this.getMyPackages()
        location == "/search-books" &&
          (search ? this.postSearchBook(search): this.getAllBooks(),
          this.setState({
            searchInput: search,
          }));
        //@ts-ignore
        // this.createChart();
      });
    } else {
      const { history }: any = this.props;
      history.push("/");
    }
  };

  componentDidUpdate = async (prevProps: Props, prevState: S) => {
    const search = await StorageProvider.get("search");
    const accountInfo = await StorageProvider.get("accountInfo");
    const location = window.location.pathname

    

    if (prevState.authToken !== this.state.authToken) {
      window.location.pathname == "/Catalogue/Home/" && this.getAllBooks();
      window.location.pathname == "/Catalogue/MyBooks/" && this.myBooks();
      window.location.pathname == "/Catalogue/MyNotes/" && this.getAllNotes();
    }

    if (
      prevState.bookDetailId &&
      prevState.bookDetailId != window.location.pathname.split("/")[3]
    ) {
      this.setState({
        bookDetailId: window.location.pathname.split("/")[3],
      });
      setTimeout(() => {
        this.getBookDetail();
      }, 1000);
    }
    if (prevState.searchInput !=null && prevState.searchInput != search ) {
      console.log(this.state.searchInput ,"searchinput",search,"search","update working")
      this.setState({
        searchInput: search,
      });
      this.state.searchInput ? this.postSearchBook(search): this.getAllBooks()
      // setTimeout(() => {
       
      // }, 2000);
    }
    if(location.split("/")[1] == "package-books" && prevState.booksChecked != this.state.booksChecked){
      this.state.booksChecked.length == location.split("/")[2] && this.handleReadSetModalClose() 
      this.state.booksChecked.length > location.split("/")[2] && toast.error(`You cannot select more than ${location.split("/")[2]} books`)
    }
    if(prevState.chaptersListing !== (this.state.chaptersListing && this.state.chaptersListing)){
      this.state.chaptersListing &&  this.settingLocation(this.state.chaptersListing[0])
    }
    if(prevState.changeSetting != this.state.changeSetting){
      if (this.state.renditionRef.current) {
        const color =  `${this.state.changeSetting &&
                    (this.state.changeSetting.selectedColor == "#000000"
                      ? "#fafafa"
                      : "")}`
                      console.log(this.state.changeSetting &&
                    this.state.changeSetting.selectedColor == "#000000",this.state.changeSetting && this.state.changeSetting.selectedColor,"+++++++++color+++++++++")
      this.state.renditionRef.current.themes.fontSize(`${this.state.changeSetting.fontSize}px`)
      this.state.renditionRef.current.themes.register('custom', {
            body :{
              'font-size' :`${this.state.changeSetting.fontSize}px` ,
              'font-weight' : `${this.state.changeSetting.fontWeight}`,
              'background-color' : `${this.state.changeSetting.backColor} !important`,
              'color':`${color}`
                  
            }
          }
        )
           this.state.renditionRef.current.themes.select('custom')

    } }
  

    if (prevState.getMonth != this.state.getMonth) {
      //@ts-ignore
      this.createChart();
    }
  };


  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {
          // get all books
          if (apiRequestCallId === this.GetAllBooksApiCallId) {
            //console.log("get all books ", responseJson.data);
            //@ts-ignore
            window.location.pathname == "/search-books" && this.filterSearchedBooks(responseJson.data)
            
            const notes = responseJson.data.filter((x:any)=>{
          return  x.attributes.note_count >0 
          })
            this.setState({
              allBooks: responseJson.data,
              notesAvailable: notes,
              Loader: false,
            });
          }

          //best seller
          if (apiRequestCallId === this.getBestSellerBooksApiCallId) {
            //console.log("get best seller ", responseJson.data);

            this.setState({
              bestSeller: responseJson.data,
              Loader: false,
            });
          }

          // get my books
          if (apiRequestCallId === this.myBooksApiCallId) {
            //console.log("my books ", responseJson.data);
            this.setState({
              myBooks: responseJson.data,
              Loader: false,
            });
          }

          // get all notes
          if (apiRequestCallId === this.getAllNotesApiCallId) {
            console.log("get all notes ", responseJson.data);
            this.setState({
              allNotes: responseJson.data,
              Loader: false,
            });
          }

          // get book detail
          if (apiRequestCallId === this.getBookDetailApiCallId) {
            //console.log("get book detail ", responseJson.data);
            this.setState({
              bookDetail: responseJson.data,
              Loader: false,
            });
          }

          // search books
          if (apiRequestCallId === this.postSearchBookApiCallId) {
            //console.log("search books ", responseJson.data);
            this.filterSearchedBooks(responseJson.data);
            this.setState({
              Loader: false,
            });
          }

          //update profile
          if (apiRequestCallId === this.putUpdateProfileApiCallId) {
            // console.log("updated profile ", responseJson.data);
            toast.success(responseJson.meta.message);
            this.settingProfileInfo(responseJson.data);
            this.setState({
              Loader: false,
              accountInfo: responseJson.data,
            });
            //console.log(this.props,"props")
            this.props.history.push('/Catalogue/Home')
          }

          //active cart
          if (apiRequestCallId === this.getActiveCartApiCallId) {
            if (responseJson.data) {
              //console.log("active cart ", responseJson.data.order.data);
              this.settingOrderedId(responseJson.data.order.data.id,responseJson.data.order?.data?.attributes?.order_items?.length);
              this.setState({
                Loader: false,
                activeCart: responseJson.data.order?.data?.attributes?.order_items?.length
              });
            }
            this.setState({
              Loader :false
            })
          }

          

          //get buy packages
          if (apiRequestCallId === this.getBuyPackagesApiCallId) {
            //console.log("buy packages", responseJson.data);
            this.setState({
              Loader: false,
              availablePackages: responseJson.data,
              selectedPackage: responseJson.data[0].id,
            });
          }

          //create cart
          if (apiRequestCallId === this.postCreateCartApiCallId) {
            //console.log("created cart", responseJson.data.order.data);
            this.setState({
              Loader: false,
            });
            this.getBookDetail();
            toast.success(`${this.state.note_id ? "Note" :"Book"} Successfully Added`);
            this.state.order_id != responseJson.data.order.data.id &&
              this.settingOrderedId(responseJson.data.order.data.id,responseJson.data.order?.data?.attributes?.order_items?.length);
          }

          // get analytics
          if (apiRequestCallId === this.getAnalyticsApiCallId) {
            //console.log("get analytics", responseJson.data);
            this.setState({
              analytics: responseJson.data,
              Loader: false,
            });
          }

          // post earnings
          if (apiRequestCallId === this.getEarningsApiCallId) {
            // console.log(
            //   "earnings",
            //   responseJson.data.monthly_week_wise.totalearnings
            // );
            let value: any = [];
            responseJson.data.monthly_week_wise.totalearnings.map(
              (data: any) => {
                value.push(data.value);
              }
            );

            this.setState({
              Loader: false,
              chartValue: value,
            });
          }

            // show notes
          if (apiRequestCallId === this.showNotesApiCallId) {
            //console.log(responseJson.data.attributes.notes,"show notes")
            this.setState({
              Loader: false,
              book :responseJson.data.attributes,
              bookNotes: responseJson.data.attributes.notes,
              setPublic: responseJson.data.attributes.notes.length>0 && responseJson.data.attributes.notes[0].attributes.set_public || false,
              bookNoteId : responseJson.data.attributes.notes.length>0 &&  responseJson.data.attributes.notes[0].id
            });
          }

            // post create notes
          if (apiRequestCallId === this.postCreateNotesApiCallId) {
            console.log(responseJson,"created notes") 
            if(responseJson.data){
              this.setState({
                createNotes : false
              })
              this.handleuploadNoteClose();
              toast.success("Note Successfully Added")
              this.getShowNotes(window.location.pathname.split("/")[2])
            }
            this.setState({
              Loader: false,
              
            });
          }
          

           // show note text
          if (apiRequestCallId === this.getNoteTextApiCallId) {
            //  console.log(responseJson.data[0],"note text")
            if(responseJson.data){
            this.setState({             
              noteText :  responseJson.data[0]        
            });
            
          }
          if(responseJson.message){
            this.setState({
              noteText:false
            })
          }
          this.setState({             
              Loader :  false        
            });
          }
          
          //edit note_text
          if (apiRequestCallId === this.putEditNoteTextApiCallId) {
            console.log(responseJson,"edit note text")
            if(responseJson.data){
              window.location.pathname.split("/")[1]=="booknotes" &&this.getNoteText(window.location.pathname.split("/")[2])
              window.location.pathname.split("/")[1]=="viewMynotes" &&this.getShowNotes(window.location.pathname.split("/")[2])
              toast.success("Notes Have Been Updated Successfully")
              this.setState({
                createNotes :false 
              })
            }
            if(responseJson.message){
                toast.error(responseJson.message)
              }
            this.setState({
              Loader: false,                                    
            });
          }

          // delete note_text
          if (apiRequestCallId === this.deleteNoteTextApiCallId) {
            console.log(responseJson," note text deleted")
            this.setState({
              Loader: false, 
              createNotes :false                      
            });
            toast.success(responseJson.message)
            window.location.pathname.split("/")[1]=="booknotes" &&this.getNoteText(window.location.pathname.split("/")[2])
            window.location.pathname.split("/")[1]=="viewMynotes" &&this.getShowNotes(window.location.pathname.split("/")[2])

          }

          // edit book note
          if (apiRequestCallId === this.putEditBookNoteApiCallId) {
            console.log(responseJson," book note edited")
            this.setState({
              Loader: false, 
              editNotes :false                      
            });
            toast.success("Notes Edited Successfully")
            this.getShowNotes(window.location.pathname.split("/")[2])

          }

          // delete book note
          if (apiRequestCallId === this.deleteBookNoteApiCallId) {
            console.log(responseJson," note deleted")
            this.setState({
              Loader: false, 
              editNotes :false                      
            });
            toast.success(responseJson.message)
            this.getShowNotes(window.location.pathname.split("/")[2])

          }

          //// all notes for purchased
          if (apiRequestCallId === this.getAllNotesForPurchasedApiCallId) {
            // console.log(responseJson," getAllNotesForPurchasedApiCallId")
            this.setState({
              Loader: false, 
              AllNotesForPurchased :responseJson.data                      
            });
          
          }

          //// book notes for purchased
           if (apiRequestCallId === this.getBookNotesForPurchasedApiCallId) {
            console.log(responseJson.data," BookNotesForPurchased")
            this.setState({
              Loader: false, 
              BookNotesForPurchased :responseJson.data                      
            });
          
          }

          //buy notes for user
          //// book notes for purchased
           if (apiRequestCallId === this.buynotesUserApiCallId) {
            console.log(responseJson.data," buynotesUserApiCallId")
            this.setState({
              Loader: false, 
              buyNotesUser :responseJson.data                      
            });
          
          }

             ////purchased notes
           if (apiRequestCallId === this.getpurchasedNotesApiCallId) {
            console.log(responseJson," purchased notes")
            this.setState({
              Loader: false, 
              purchasedNotes :responseJson.data                      
            });
          
          }

          //purchasednotes preview
          if (apiRequestCallId === this.getpurchasedNotesPreviewApiCallId) {
            //console.log(responseJson," purchased notes preview")
            this.setState({
              Loader: false, 
              purchasedNotesPreview :responseJson.data                      
            });
          
          }
             
             //product rating
          if (apiRequestCallId === this.postProductReviewApiCallId) {
            // console.log(responseJson," purchased rating")
            toast.success("Review Successfully Added")
            this.setState({
              Loader: false, 
                                   
            });
            this.props.history.push('/Catalogue/Home')
          
          }

          ///refund book          
           if (apiRequestCallId === this.postRefundBookApiCallId) {
            console.log(responseJson," reund book")
            this.setState({
              Loader: false, 
            });
            this.handleReadSetModalClose()
            this.myBooks()
            toast.success(responseJson.message)
          
          }


          /// my Packages
          if (apiRequestCallId === this.getMyPackagesApiCallId) {
            console.log(responseJson," my packages")
            this.setState({
              Loader: false, 
              myPackages :responseJson.data                      
            });
          
          }

          /// add Packages books
          if (apiRequestCallId === this.postaddPackageBooksApiCallId) {
            console.log(responseJson," packages books")
            if(responseJson.data){
              toast.success("Books Successfully Added To the Package")
              
            }
            this.handleReadSetModalClose()
            this.setState({
              Loader: false, 
            });
            this.props.history.push("/MyPackages")
          
          }
        

          //cancel book pass
          if (apiRequestCallId === this.postCancelBookPassApiCallId) {
            //console.log(responseJson," pass cancelled")
            toast.success(responseJson.message)
           this.handleReadSetModalClose() 
           this.setState({
              Loader: false, 
            });
            this.getMyPackages()
          
          }

        }
      } else {
        StorageProvider.remove("authToken");
        // this.sessionLogout();
      }
    }
  }

  // for session expire
  sessionLogout = async () => {
    const accountInfo = await StorageProvider.get("accountInfo");

    this.props
      .showAlert({
        title: "Session Expired",
        message: "Please Login again!",
      })
      .then((data: any) => {
        //console.log(data);
        StorageProvider.remove("authToken");
        StorageProvider.remove("orderId");
        StorageProvider.remove("accountInfo");
        
      })
      .then(() => {
        
        StorageProvider.remove("orderId");

      })
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };

  // get all books
  getAllBooks = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token:  this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetAllBooksApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetAllBooksAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };                                                         

  // get BestSellerBooks
  getBestSellerBooks = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBestSellerBooksApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getBestSellerBooksAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //// get my books
  myBooks = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.myBooksApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetMyBooksAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //// get all notes
  getAllNotes = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllNotesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllNotesAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //// get book details
  getBookDetail = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBookDetailApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetAllBooksAPiEndPoint + `/${this.state.bookDetailId || this.state.bookReadId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //search book
  postSearchBook = (search: any): boolean => {
    // const product = this.state.productToBeAdded
    // this.myBooks();
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
      search_string: search,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postSearchBookApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postSearchBookAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // updtae profile
  putUpdateProfile = (values: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
      data: {
        type: "email_account",
        attributes: {
          full_name: values.fullName,
          email: values.email,
          dob: values.DOB,
          major: values.major,
          college: values.college,
          state_n_city: values.state,
        },
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putUpdateProfileApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putUpdateProfileAPiEndPoint + `${this.state.accountInfo.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //screate cart
  postCreateCart = (id: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };
    this.gettingOrderID();

    setTimeout(() => {
      const httpBody = {
        book_id: !this.state.note_id && id,
        quantity: "1",
        cart_id: this.state.order_id ? this.state.order_id : "",
       note_id: this.state.note_id && id
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.postCreateCartApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.postCreateCartAPiEndPoint
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypePost
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 1000);
    return true;
  };

  // get active cart
  getActiveCart = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getActiveCartApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getActiveCartAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // buy pACKages

  getBuyPackages = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBuyPackagesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getBuyPackagesAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //my packages
  getMyPackages = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getMyPackagesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getMyPackagesAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // get analytics
  getAnalytics = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAnalyticsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAnalyticsAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // post earnings
  postEarnings = (date: any): boolean => {
    const year = date.format("YYYY");
    const month = date.format("M");
    const days = moment(date).daysInMonth();

    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    setTimeout(() => {
      const httpBody = {
        start_date: `${year}-${month}-01`,
        end_date: `${year}-${month}-${days}`,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getEarningsApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getEarningsAPiEndPoint
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypePost
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 1000);
    return true;
  };


  //create book notes
  postCreateNotes = (values: any): boolean => {
    
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
       "note" : {
         "note_id": this.state.bookNoteId ? this.state.bookNoteId : "",
        "title" : values.title,
        "book_id" : window.location.pathname.split("/")[2],
        "price" : "",
        "chapter_no" :this.state.currentChapterNo && this.state.currentChapterNo ,
        "chapter_name" : this.state.currentChapterName && this.state.currentChapterName,
        "time_from" : "02:00",
        "note_data" : values.note_data
        
        
    }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCreateNotesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCreateNotesAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //show notes
  getShowNotes = (id:any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.showNotesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCreateNotesAPiEndPoint +`/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

//// get note_text
getNoteText = (id:any): boolean => {
  console.log("note text")
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getNoteTextApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getNoteTextAPiEndPoint +`/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //edit notes_text  
  putEditNoteText = (values: any,id:any): boolean => {
    
    
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
       "id": id,
    "note_data": values.note_data,
    "note_title": values.title
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putEditNoteTextApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putEditNoteTextAPiEndPoint 
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

// delete note text
deleteNoteText = (id:any): boolean => {
  console.log("note text")
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteNoteTextApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteNoteTextAPiEndPoint +`/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeDelete
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  // edit book note
  putEditBookNote = (values: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
       "id": this.state.bookNotes && this.state.bookNotes[0].id , 
    "set_public":values.note_ForSale,
    "price": values.price

    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putEditBookNoteApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putEditBookNoteAPiEndPoint 
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // delete book note
deleteBookNote = (id:any): boolean => {
  console.log("note text")
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteBookNoteApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCreateNotesAPiEndPoint +`/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeDelete
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

//all notes for purchased
getAllNotesForPurchased = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllNotesForPurchasedApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllNotesForPurchasedAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }; 

 // book notes for purchased
 getBookNotesForPurchased = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBookNotesForPurchasedApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getBookNotesForPurchasedAPiEndPoint +`/${window.location.pathname.split("/")[2]}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  



  //buynotesUser 
 getbuynotesUser = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.buynotesUserApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.buynotesUserAPiEndPoint +`/${window.location.pathname.split("/")[2]}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  

 
 
 
 
 
 
 //pucheased notes
 getpurchasedNotes = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getpurchasedNotesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getpurchasedNotesAPiEndPoint 
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
 

 //purchased notes preview
getpurchasedNotesPreview = (): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getpurchasedNotesPreviewApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getpurchasedNotesAPiEndPoint +`/${window.location.pathname.split('/')[2]}` 
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  settingBookId = async (id: any) => {
    await StorageProvider.set("bookId", id);
  };

  settingProfileInfo = async (data: any) => {
    await StorageProvider.set("accountInfo", JSON.stringify(data));
  };

  gettingOrderID = async () => {
    const order_id = await StorageProvider.get("orderId");
    this.setState({
      order_id: order_id,
    });
  };
  settingOrderedId = async (id: any,length:any) => {
     StorageProvider.set("orderId", id);
    StorageProvider.set("cartLength", length);

  };

  filterSearchedBooks = (data: any) => {
    const filteredSearchBooks = data.filter((x: any) => {
      return x.attributes.is_purchased == false;
    });
    const filteredMySearchBooks = data.filter((x: any) => {
      return x.attributes.is_purchased == true;
    });
    this.setState({
      searchedBooks: filteredSearchBooks,
      searchedMyBooks:filteredMySearchBooks
    });
  };

  handleReadSetModalClose = () => {
    this.setState({
      readSetModal: !this.state.readSetModal,
    });
  };
  handleCustomize = async (customize: any) => {
    this.setState({
      changeSetting: customize,
    });
    await StorageProvider.set("customize", JSON.stringify(customize));
  };



//post review
  postProductReview = (rating: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody ={
    "review": { 
        "note_id": window.location.pathname.split('/')[2],
        "rating": rating,
        "comment": ""
    }
}

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postProductReviewApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postProductReviewAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  // add subscribed books
  postaddPackageBooks = (): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };
    this.setState({
      Loader: true,
    });

    function useQuery() {
  return new URLSearchParams(window.location.search);
}
let query = useQuery();
    
    let books_id :any =[];
  this.state.booksChecked.forEach((book:any)=>{
    console.log(book)
    //@ts-ignore
   books_id.push(book.name)
  })

    const httpBody ={
    "order_id":query.get("order_id"),
    "book_ids":books_id
}

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postaddPackageBooksApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postaddPackageBooksAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

// book pass cancelled

postBookPassCancel = (order_id:any,package_id:any): boolean => {
  const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };
    this.setState({
      Loader: true,
    });

    const httpBody ={
     "data": {
        "attributes": {
            "order_id": order_id,
            "package_id": package_id
        }
    }
}

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCancelBookPassApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCancelPassAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  //refund book
   postRefundBook = (bookId: any,order_id:any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody ={
    "data": {
        "attributes": {
            "order_id": order_id,
            "book_id": bookId
        }
    }
}

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postRefundBookApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postRefundBookAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };



handleCreateNotesClose = () => {
    this.setState({
      createNotes: !this.state.createNotes,
      
    });
  };
handleuploadNoteClose = () => {
    this.setState({
      upload_note: !this.state.upload_note,
      
    });
  };
  handleeditNotesClose =()=>{
    this.setState({
      editNotes: !this.state.editNotes,
    });
  }

  bookFinishedClose =()=>{
    this.setState({
      bookFinished: !this.state.bookFinished,
    });
  }
  settingLocation =(x:any)=>{
    console.log(x,"location workigjnmk")
    this.setState({
      location : x.href,
      currentChapterName:x.label,
      currentChapterNo :1
    })
  }
  chapterChanged=(e:any)=>{
    let chapterNo;
    if (this.state.renditionRef.current) {
      const currentChap = this.state.chaptersListing.filter((chap:any,index:any)=>{ 
        if(chap.href == this.state.renditionRef.current.location.start.href){
           chapterNo = index+1
          return chap.href == this.state.renditionRef.current.location.start.href
        }
    })[0]
    if(currentChap){
      this.setState({    
        currentChapterName:currentChap && currentChap.label,
        currentChapterNo: chapterNo && chapterNo
      })
    }
    }
    
  }
  



}

