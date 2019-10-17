import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Header, Contact, Spinner } from "../../components";
import { CHAT_SCREEN } from "../../constants";
import { LIST_ITEM_HEIGHT } from "../../theme";
import { fetchContacts } from "../../api";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], loading: true };
  }

  componentDidMount() {
    fetchContacts().then(contacts =>
      this.setState({ contacts, loading: false })
    );
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item }) {
    const { navigation } = this.props;

    return (
      <Contact
        key={item.id}
        openChat={() => navigation.navigate(CHAT_SCREEN, { name: item.name })}
        avatar={item.avatarURL}
        name={item.name}
        status={item.status}
      />
    );
  }

  render() {
    const { contacts, loading } = this.state;

    return loading ? (
      <Spinner />
    ) : (
      <View style={styles.container}>
        <FlatList
          data={contacts}
          renderItem={this.renderItem}
          getItemLayout={(_, index) => ({
            length: LIST_ITEM_HEIGHT,
            offset: LIST_ITEM_HEIGHT * index,
            index
          })}
        />
      </View>
    );
  }
}
