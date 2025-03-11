import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFViewer,
  Font
} from '@react-pdf/renderer';
import { useScheduleStore } from '../store/scheduleStore';

Font.register({ family: 'Montserrat', src: 'http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf', fontStyle: 'normal', fontWeight: 'normal',});

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh',
  },
  page: {
    padding: 20,
    backgroundImage: 'https://thiagotorresz.github.io/kids-schedule/img/background.png',
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    marginBottom: 15,
  },
  logo: {
    width: 140,
    height: 70,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bg: {
    width: '100vw',
    height: '90vh',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dayTitle: {
    fontSize: 40,
    fontFamily: 'Montserrat',
    color: '#2F3152',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#2F3152',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    width: '48%',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5',
    
  },
  timeBox: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginRight: -13,
  },
  timeText: {
    fontSize: 27,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  activityDetails: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    paddingLeft: '28',
    paddingVertical: '3',
    textTransform: 'uppercase',
    zIndex: '1',
    backgroundColor: 'white',
  },
  activityName: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: '#2F3152',
  },
  activityLocation: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2F3152',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#36324C',
    fontSize: 15,
    fontWeight: 'bolder',
  },
});

export const PDFSchedule: React.FC = () => {
  const activities = useScheduleStore((state) => state.activities);
  const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {daysOfWeek.map((day) => {
          const sortedActivities = activities
            .filter((activity) => activity.dayOfWeek === day)
            .sort((a, b) => a.time.localeCompare(b.time));
          const midIndex = Math.ceil(sortedActivities.length / 2);
          const firstColumn = sortedActivities.slice(0, midIndex);
          const secondColumn = sortedActivities.slice(midIndex);

          return (
            <Page key={day} size="A4" orientation="landscape" style={styles.page}>
              <Image src="https://thiagotorresz.github.io/kids-schedule/img/logo.jpg" style={styles.logo} />
              <Image src="https://thiagotorresz.github.io/kids-schedule/img/background.png" style={styles.bg} />

              <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>
              <Text style={styles.subtitle}>PROGRAMAÇÃO INFANTIL</Text>

              <View style={styles.activitiesContainer}>
                {[firstColumn, secondColumn].map((column, colIndex) => (
                  <View key={colIndex} style={styles.column}>
                    {column.map((activity, index) => {
                      const isEven = (colIndex === 0 ? index : index + 1) % 2 === 0;
                      return (
                        <View
                          key={activity.id}
                          style={styles.activity}
                        >
                          <View
                            style={[styles.timeBox, { backgroundColor: isEven ? '#FDB830' : '#2F3152' }]}
                          >
                            <Text style={[styles.timeText, { color: isEven ? '#2F3152' : 'white' }]}>{activity.time}</Text>
                          </View>
                          <View style={[styles.activityDetails, { borderColor: isEven ? '#FDB830' : '#2F3152' }]}>
                            <Text style={styles.activityName}>{activity.name}</Text>
                            <Text style={styles.activityLocation}>{activity.location}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>

              <View style={[styles.footer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                <Image src="https://thiagotorresz.github.io/kids-schedule/img/exclamation-2.png" style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text>AS PROGRAMAÇÕES PODEM SOFRER ALTERAÇÕES.</Text>
              </View>
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
};
